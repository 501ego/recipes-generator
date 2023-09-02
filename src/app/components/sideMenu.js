import React, { useState, useEffect, useRef } from 'react'

export default function SideMenu({ recipes, setSelectedRecipe }) {
  const [isOpen, setIsOpen] = useState(false)

  const menuRef = useRef(null)

  const handleOutsideClick = e => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userLogged')
    localStorage.removeItem('userData')
    window.location.reload()
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <section
      ref={menuRef}
      className="fixed top-0 left-0 p-1 text-zinc-900 z-10"
    >
      <article className="flex flex-row gap-1 items-center">
        <div className="flex flex-col gap-1">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-indigo-400 hover:text-indigo-500"
            >
              <path
                fillRule="evenodd"
                d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zm1.5 1.5a.75.75 0 00-.75.75V16.5a.75.75 0 001.085.67L12 15.089l4.165 2.083a.75.75 0 001.085-.671V5.25a.75.75 0 00-.75-.75h-9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="block bg-zinc-50">
              <button
                className="block px-2 py-1 text-xs text-indigo-400 hover:text-indigo-600"
                onClick={handleLogout}
              >
                Logout
              </button>
              {recipes !== [] && recipes.length > 0 ? (
                recipes.map(recipe => (
                  <button
                    key={recipe._id}
                    onClick={() => {
                      setSelectedRecipe(recipe)
                    }}
                    className="block px-2 py-1 text-xs text-zinc-500 font-semibold hover:bg-indigo-200 text-start w-full"
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
        </div>
      </article>
    </section>
  )
}
