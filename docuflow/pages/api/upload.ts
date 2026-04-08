import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import mammoth from 'mammoth'
import * as XLSX from 'xlsx'
const pdfParse = require('pdf-parse') as (dataBuffer: Buffer) => Promise<{ text: string }>

export const config = {
  api: {
    bodyParser: false,
  },
}

interface SummaryResponse {
  title: string
  summary: string
  keyPoints: string[]
  error?: string
}

function normalizeExtractedText(rawText: string): string {
  return rawText
    .replace(/\r\n/g, '\n')
    .replace(/\u0000/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function getTopKeywords(text: string, max = 5): string[] {
  const stopWords = new Set([
    '그리고', '하지만', '또한', '에서', '으로', '입니다', '합니다', '대한', '관련', '있는', '하는', 'the', 'and', 'for', 'with',
  ])

  const words = text
    .toLowerCase()
    .replace(/[^\uac00-\ud7af\u1100-\u11ff\u3130-\u318f\u0041-\u005a\u0061-\u007a\u0030-\u0039]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !stopWords.has(word))

  const freq: Record<string, number> = {}
  words.forEach((word) => {
    freq[word] = (freq[word] || 0) + 1
  })

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([word]) => word)
}

function extractCoreSentences(text: string, count = 3): string[] {
  const sentences = text
    .replace(/\n/g, ' ')
    .split(/(?<=[.!?。다])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 20)

  if (sentences.length === 0) return []

  const keywords = getTopKeywords(text, 15)
  const scored = sentences.map((sentence) => {
    const score = keywords.reduce((acc, keyword) => (sentence.toLowerCase().includes(keyword) ? acc + 1 : acc), 0)
    return { sentence, score }
  })

  return scored
    .sort((a, b) => b.score - a.score || b.sentence.length - a.sentence.length)
    .slice(0, count)
    .map((item) => item.sentence)
}

function extractCitationCandidates(text: string, count = 5): string[] {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  const citationPatterns = [
    /\bdoi:\s*10\.\d{4,9}\/[-._;()/:A-Z0-9]+\b/i,
    /https?:\/\/\S+/i,
    /\[[0-9]{1,3}\]/,
    /\([A-Za-z가-힣]+,\s?\d{4}\)/,
    /참고문헌|references|bibliography/i,
  ]

  const matches = lines.filter((line) => citationPatterns.some((pattern) => pattern.test(line)))
  return matches.slice(0, count)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SummaryResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ title: '', summary: '', keyPoints: [], error: 'Method not allowed' })
  }

  const form = formidable({
    maxFileSize: 10 * 1024 * 1024, // 10MB
  })

  try {
    const [fields, files] = await form.parse(req)
    const file = files.file?.[0]

    if (!file) {
      return res.status(400).json({ title: '', summary: '', keyPoints: [], error: 'No file uploaded' })
    }

    const filePath = file.filepath
    const originalFilename = file.originalFilename || 'unknown'
    const mimeType = file.mimetype || ''

    let text = ''

    // Extract text based on file type
    if (mimeType.includes('pdf')) {
      const data = await pdfParse(fs.readFileSync(filePath))
      text = data.text
    } else if (mimeType.includes('word') || originalFilename.endsWith('.docx')) {
      const result = await mammoth.extractRawText({ path: filePath })
      text = result.value
    } else if (mimeType.includes('excel') || originalFilename.endsWith('.xlsx') || originalFilename.endsWith('.xls')) {
      const workbook = XLSX.readFile(filePath)
      text = workbook.SheetNames
        .map((sheetName) => {
          const sheet = workbook.Sheets[sheetName]
          const csv = XLSX.utils.sheet_to_csv(sheet)
          return `### 시트: ${sheetName}\n${csv}`
        })
        .join('\n\n')
    } else if (mimeType.includes('text') || originalFilename.endsWith('.txt')) {
      text = fs.readFileSync(filePath, 'utf-8')
    } else {
      text = `파일명: ${originalFilename}\n파일 형식: ${mimeType}\n\n이 파일 형식은 현재 지원되지 않습니다. PDF, Word, Excel, TXT 파일만 지원합니다.`
    }

    const normalizedText = normalizeExtractedText(text)

    // Clean up temp file
    fs.unlinkSync(filePath)

    // Generate summary from extracted text
    const summary = generateSummary(normalizedText, originalFilename)

    res.status(200).json(summary)
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({
      title: '처리 오류',
      summary: '파일 처리 중 오류가 발생했습니다.',
      keyPoints: ['오류 발생'],
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

function generateSummary(text: string, filename: string): SummaryResponse {
  // Get file extension for title
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')
  
  const lines = text.split('\n').filter(line => line.trim().length > 0)
  const previewLines = lines.slice(0, 12)
  
  // Count statistics
  const totalChars = text.length
  const totalLines = lines.length
  const wordCount = text.split(/\s+/).length
  
  const sortedWords = getTopKeywords(text, 5)
  const coreSentences = extractCoreSentences(text, 3)
  const citationCandidates = extractCitationCandidates(text, 5)

  // Generate summary content
  const keyPoints = [
    `파일 형식: ${ext.toUpperCase()}`,
    `총 문자 수: ${totalChars.toLocaleString()}자`,
    `총 라인 수: ${totalLines.toLocaleString()}줄`,
    ...(sortedWords.length > 0 ? [`주요 키워드: ${sortedWords.slice(0, 3).join(', ')}`] : []),
    ...(coreSentences.length > 0 ? [`핵심 문장 수집: ${coreSentences.length}개`] : []),
    ...(citationCandidates.length > 0 ? [`출처 후보 감지: ${citationCandidates.length}개`] : ['출처 후보 감지: 0개'])
  ]

  const summaryText = previewLines.length > 0
    ? [
      `• 파일명: ${filename}`,
      `• 총 ${totalLines}줄, ${totalChars.toLocaleString()}자, 단어 ${wordCount.toLocaleString()}개`,
      '',
      '[핵심 내용]',
      ...(coreSentences.length > 0
        ? coreSentences.map((sentence, index) => `${index + 1}. ${sentence}`)
        : ['1. 문장을 추출하기 어려워 원문 미리보기를 제공합니다.']),
      '',
      '[참고문헌/출처 후보]',
      ...(citationCandidates.length > 0
        ? citationCandidates.map((line, index) => `${index + 1}. ${line}`)
        : ['1. 형식화된 출처 문장을 찾지 못했습니다.']),
      '',
      '[원문 미리보기]',
      `${previewLines.slice(0, 6).join('\n')}${previewLines.length > 6 ? '\n...' : ''}`,
    ].join('\n')
    : `• 파일명: ${filename}\n• 추출된 텍스트: ${totalChars.toLocaleString()}자\n\n파일에서 텍스트를 추출했습니다.`

  return {
    title: nameWithoutExt || '문서 요약',
    summary: summaryText,
    keyPoints: keyPoints.length > 0 ? keyPoints : ['문서 분석 완료']
  }
}
