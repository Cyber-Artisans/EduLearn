export interface Certificate {
  id: string
  userId: string
  courseId: string
  studentName: string
  courseName: string
  instructorName: string
  issuedAt: string   // ISO
  certificateCode: string  // e.g. "EDL-A7F2-9C1B"
}