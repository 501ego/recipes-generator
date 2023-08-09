import React, { useState, useEffect, useRef } from 'react'

export default function SideMenu({ recipes, setSelectedRecipe }) {
  const [isOpen, setIsOpen] = useState(false)
  const [SubmenuIsOpen, setSubmenuIsOpen] = useState(false)
  const [showRecipes, setShowRecipes] = useState(false)
  const menuRef = useRef(null)

  const handleOutsideClick = e => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <div
      ref={menuRef}
      className="absolute top-0 left-0 p-1 text-zinc-900 max-w-[260px]"
    >
      <button onClick={() => setIsOpen(!isOpen)} className="p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-indigo-400 hover:text-indigo-500"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2 bg-white border rounded">
          <button
            onClick={() => setShowRecipes(!showRecipes)}
            className="block px-4 py-2 text-sm hover:bg-indigo-200 font-bold w-full text-start"
          >
            Favoritos
          </button>
          {showRecipes && (
            <div className="block">
              {recipes.length > 0 ? (
                recipes.map(recipe => (
                  <button
                    key={recipe._id}
                    onClick={() => {
                      setSelectedRecipe(recipe)
                    }}
                    className="block px-2 py-1 text-xs hover:bg-indigo-200 text-start w-full"
                  >
                    {recipe.name}
                  </button>
                ))
              ) : (
                <p className="block px-2 py-1 text-xs text-indigo-400">
                  'No hay recetas'
                </p>
              )}
            </div>
          )}

          <button
            onClick={() => setSubmenuIsOpen(!SubmenuIsOpen)}
            className="w-full text-start block px-4 py-2 text-sm hover:bg-indigo-200 font-bold"
          >
            Opciones
          </button>
        </div>
      )}
    </div>
  )
}
