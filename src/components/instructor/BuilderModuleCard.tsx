import { useState } from 'react'
import {
  FiChevronDown,
  FiChevronRight,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiCheck,
  FiX,
  FiHelpCircle,
} from 'react-icons/fi'
import { BuilderLessonRow } from './BuilderLessonRow'
import type { Lesson, Module } from '../../types/lesson'

interface BuilderModuleCardProps {
  module: Module
  onUpdate: (patch: Partial<Module>) => void
  onDelete: () => void
  onAddLesson: (title: string, duration: number) => void
  onUpdateLesson: (lessonId: string, patch: Partial<Lesson>) => void
  onDeleteLesson: (lessonId: string) => void
  onMoveLesson: (lessonId: string, direction: 'up' | 'down') => void
}

export function BuilderModuleCard({
  module,
  onUpdate,
  onDelete,
  onAddLesson,
  onUpdateLesson,
  onDeleteLesson,
  onMoveLesson,
}: BuilderModuleCardProps) {
  const [open, setOpen] = useState(true)
  const [editingTitle, setEditingTitle] = useState(false)
  const [draftTitle, setDraftTitle] = useState(module.title)
  const [addingLesson, setAddingLesson] = useState(false)
  const [newLessonTitle, setNewLessonTitle] = useState('')
  const [newLessonDuration, setNewLessonDuration] = useState(10)
  const [confirmDelete, setConfirmDelete] = useState(false)

  function saveTitle() {
    if (!draftTitle.trim()) return
    onUpdate({ title: draftTitle.trim() })
    setEditingTitle(false)
  }

  function commitNewLesson() {
    if (!newLessonTitle.trim()) return
    onAddLesson(newLessonTitle.trim(), Math.max(1, newLessonDuration))
    setNewLessonTitle('')
    setNewLessonDuration(10)
    setAddingLesson(false)
  }

  const totalMinutes = module.lessons.reduce(
    (s, l) => s + l.durationMinutes,
    0,
  )

  return (
    <div className="card-edulearn p-0! overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-base-300 flex-wrap">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="btn btn-ghost btn-xs btn-circle"
          aria-label={open ? 'Collapse module' : 'Expand module'}
        >
          {open ? <FiChevronDown /> : <FiChevronRight />}
        </button>

        <span className="text-xs font-bold uppercase tracking-wider text-base-content/50">
          Module {module.order}
        </span>

        {editingTitle ? (
          <div className="flex-1 flex items-center gap-2 min-w-50">
            <input
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveTitle()
                if (e.key === 'Escape') setEditingTitle(false)
              }}
              className="input input-bordered input-sm flex-1"
              autoFocus
            />
            <button
              type="button"
              onClick={saveTitle}
              className="btn btn-success btn-xs btn-circle"
              aria-label="Save title"
            >
              <FiCheck />
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingTitle(false)
                setDraftTitle(module.title)
              }}
              className="btn btn-ghost btn-xs btn-circle"
              aria-label="Cancel"
            >
              <FiX />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditingTitle(true)}
            className="flex-1 text-left font-semibold hover:text-primary transition-colors min-w-0 truncate"
          >
            {module.title}
          </button>
        )}

        <span className="text-xs text-base-content/60 hidden sm:inline">
          {module.lessons.length} lessons · {totalMinutes} min
        </span>

        <div className="flex items-center gap-1 ml-2">
          <button
            type="button"
            onClick={() => setEditingTitle(true)}
            className="btn btn-ghost btn-xs btn-circle"
            aria-label="Rename module"
          >
            <FiEdit2 />
          </button>
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="btn btn-ghost btn-xs btn-circle text-error hover:bg-error/10"
            aria-label="Delete module"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* Body */}
      {open && (
        <div className="p-4 space-y-2 bg-base-200/40">
          {module.lessons.length === 0 && !addingLesson && (
            <p className="text-sm text-base-content/50 text-center py-4">
              No lessons yet. Add your first lesson below.
            </p>
          )}

          {module.lessons.map((lesson, i) => (
            <BuilderLessonRow
              key={lesson.id}
              lesson={lesson}
              index={i}
              isFirst={i === 0}
              isLast={i === module.lessons.length - 1}
              onUpdate={(patch) => onUpdateLesson(lesson.id, patch)}
              onDelete={() => onDeleteLesson(lesson.id)}
              onMoveUp={() => onMoveLesson(lesson.id, 'up')}
              onMoveDown={() => onMoveLesson(lesson.id, 'down')}
            />
          ))}

          {addingLesson ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 rounded-lg border border-primary/40 bg-primary/5 p-3">
              <input
                type="text"
                value={newLessonTitle}
                onChange={(e) => setNewLessonTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') commitNewLesson()
                  if (e.key === 'Escape') setAddingLesson(false)
                }}
                placeholder="Lesson title"
                className="input input-bordered input-sm flex-1"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={newLessonDuration}
                  onChange={(e) =>
                    setNewLessonDuration(Number(e.target.value))
                  }
                  className="input input-bordered input-sm w-20"
                  aria-label="Duration in minutes"
                />
                <span className="text-xs text-base-content/60">min</span>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={commitNewLesson}
                  disabled={!newLessonTitle.trim()}
                  className="btn btn-primary btn-sm"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setAddingLesson(false)}
                  className="btn btn-ghost btn-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setAddingLesson(true)}
                className="btn btn-outline btn-sm"
              >
                <FiPlus /> Add lesson
              </button>
              {!module.quizId && (
                <button
                  type="button"
                  onClick={() =>
                    onUpdate({ quizId: `${module.courseId}-quiz-${module.id}` })
                  }
                  className="btn btn-ghost btn-sm"
                >
                  <FiHelpCircle /> Add module quiz
                </button>
              )}
              {module.quizId && (
                <span className="badge badge-accent badge-outline badge-sm">
                  Quiz added
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="alert alert-warning rounded-none flex justify-between flex-wrap gap-2">
          <span className="text-sm">
            Delete this module and all its lessons?
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="btn btn-xs btn-ghost"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="btn btn-xs btn-error"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}