import React from 'react'

function Navbar() {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className='mycontainer flex justify-between items-center px-4 h-14 py-5'>
            <div className='logo font-bold text-white text-2xl'>
                <span className='text-green-700'>&lt;</span>
                PassOP/
                <span className='text-green-700'>&gt;</span>
            </div>
            </div>
        </nav>
    )
}

export default Navbar
