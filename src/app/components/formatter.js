import React from 'react'

export function formatCompletion(completion) {
  return completion.split('\n').map((line, i) => {
    const parts = line.split(':')
    const isInstruction = /^\d+\.\s/.test(parts[0])
    const lineContent = isInstruction
      ? parts[0].replace(/^\d+\.\s/, '')
      : parts[0]

    return (
      <span key={i} className="text-start">
        {isInstruction ? (
          <li
            role="list"
            className="marker:text-sky-400 list-disc pl-5 space-y-1"
          >
            {lineContent}
            {parts[1] && `: ${parts[1]}`}
          </li>
        ) : (
          <>
            {lineContent && <b>{lineContent}</b>}
            {parts[1] && `: ${parts[1]}`}
            <br />
          </>
        )}
      </span>
    )
  })
}
