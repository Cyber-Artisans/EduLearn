import { useState } from 'react'
import { FiEdit2, FiTrash2, FiCheck, FiX, FiMenu } from 'react-icons/fi'
import type { Lesson } from '../../types/lesson'

interface BuilderLessonRowProps {
  lesson: Lesson
  index: number
  isFirst: boolean
  isLast: boolean
  onUpdate: (patch: Partial<Lesson>) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

export function BuilderLessonRow({
  lesson,
  index,
  isFirst,
  isLast,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: BuilderLessonRowProps) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(lesson.title)
  const [duration, setDuration] = useState(lesson.durationMinutes)
  const [isPreview, setIsPreview] = useState(lesson.isPreview)

  function save() {
    if (!title.trim()) return
    onUpdate({
      title: title.trim(),
      durationMinutes: Math.max(1, Number(duration) || 1),
      isPreview,
    })
    setEditing(false)
  }

  function cancel() {
    setTitle(lesson.title)
    setDuration(lesson.durationMinutes)
    setIsPreview(lesson.isPreview)
    setEditing(false)
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-base-300 p-3 bg-base-100">
      <div className="flex flex-col gap-0.5">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={isFirst}
          className="text-base-content/30 hover:text-base-content disabled:opacity-30"
          aria-label="Move up"
        >
          ▲
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={isLast}
          className="text-base-content/30 hover:text-base-content disabled:opacity-30"
          aria-label="Move down"
        >
          ▼
        </button>
      </div>

      <FiMenu className="text-base-content/30 shrink-0" />

      <span className="text-xs text-base-content/50 w-6 text-center tabular-nums">
        {index + 1}
      </span>

      {editing ? (
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered input-sm flex-1"
            placeholder="Lesson title"
            autoFocus
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="input input-bordered input-sm w-20"
              aria-label="Duration in minutes"
            />
            <span className="text-xs text-base-content/60">min</span>
            <label className="flex items-center gap-1.5 text-xs">
              <input
                type="checkbox"
                className="checkbox checkbox-xs checkbox-primary"
                checked={isPreview}
                onChange={(e) => setIsPreview(e.target.checked)}
              />
              Preview
            </label>
          </div>
        </div>
      ) : (
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{lesson.title}</p>
          <p className="text-xs text-base-content/50">
            {lesson.durationMinutes} min
            {lesson.isPreview && ' · Free preview'}
          </p>
        </div>
      )}

      <div className="flex items-center gap-1 shrink-0">
        {editing ? (
          <>
            <button
              type="button"
              onClick={save}
              className="btn btn-success btn-xs btn-circle"
              aria-label="Save"
            >
              <FiCheck />
            </button>
            <button
              type="button"
              onClick={cancel}
              className="btn btn-ghost btn-xs btn-circle"
              aria-label="Cancel"
            >
              <FiX />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="btn btn-ghost btn-xs btn-circle"
              aria-label="Edit lesson"
            >
              <FiEdit2 />
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="btn btn-ghost btn-xs btn-circle text-error hover:bg-error/10"
              aria-label="Delete lesson"
            >
              <FiTrash2 />
            </button>
          </>
        )}
      </div>
    </div>
  )
}