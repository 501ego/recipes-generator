import React from 'react'

export function formatCompletion(completion) {
  return completion.split('\n').map((line, i) => {
    const parts = line.split(':')
    const isInstruction = /^(\d+\s?\.\s?[A-Za-z]?)\s?/.test(parts[0])
    const [number, content] = isInstruction
      ? parts[0].split(/\.\s?/)
      : [null, parts[0]]

    return (
      <React.Fragment key={i}>
        {isInstruction ? (
          <li role="list" className="list-none pl-5 space-y-1">
            <span className="text-indigo-400">{number.trim()}.- </span>
            {content}
            {parts[1] && `: ${parts[1]}`}
          </li>
        ) : (
          <span className="text-start">
            {content && <b>{content}</b>}
            {parts[1] && `: ${parts[1]}`}
            <br />
          </span>
        )}
      </React.Fragment>
    )
  })
}
