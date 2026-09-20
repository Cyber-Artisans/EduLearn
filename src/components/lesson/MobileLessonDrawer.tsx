import { useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { LessonSidebar } from './LessonSidebar'
import type { Module } from '../../types/lesson'

interface MobileLessonDrawerProps {
    open: boolean
    onClose: () => void
    modules: Module[]
    currentLessonId: string | null
    completedSet: Set<string>
    progressPercent: number
    onSelectLesson: (lessonId: string) => void
}

export function MobileLessonDrawer({
    open,
    onClose,
    modules,
    currentLessonId,
    completedSet,
    progressPercent,
    onSelectLesson,
}: MobileLessonDrawerProps) {
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose()
        }
        if (open) document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [open, onClose])

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                onClick={onClose}
                aria-hidden="true"
            />
            <aside
                aria-label="Course curriculum"
                className={`fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-base-100 shadow-2xl transition-transform lg:hidden flex flex-col ${open ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between border-b border-base-300 p-4">
                    <span className="font-bold">Curriculum</span>
                    <button
                        type="button"
                        className="btn btn-ghost btn-sm btn-circle"
                        onClick={onClose}
                        aria-label="Close curriculum"
                    >
                        <FiX className="h-5 w-5" />
                    </button>
                </div>
                <div className="flex-1 overflow-hidden">
                    <LessonSidebar
                        modules={modules}
                        currentLessonId={currentLessonId}
                        completedSet={completedSet}
                        progressPercent={progressPercent}
                        onSelectLesson={(id) => {
                            onSelectLesson(id)
                            onClose()
                        }}
                    />
                </div>
            </aside>
        </>
    )
}