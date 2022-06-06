import React from 'react'

const LinkCard = ({ resource }) => {
  return (
    <div className='inline-flex max-w-[100%] items-center mb-2 rounded-md bg-white hover:brightness-[0.95] transition-colors shadow py-2 px-4'>
        <i style={{ fontSize: '0.9rem' }}  className='fa-solid fa-link text-slate-500 mr-2'></i>
        <a href={resource.url} target='_blank' rel='noopener noreferrer'
        className='text-base sm:flex sm:items-center sm:gap-2 text-slate-500 hover:text-slate-600 transition-all'>
            <span className='break-all'>{resource.text.length > 50 ? resource.text.substring(0, 50) + '...' : resource.text}</span>
            <span style={{ wordWrap: 'break-word' }} className='break-all text-sm text-slate-400'>({resource.url.length > 50 ? resource.url.substring(0, 50) + '...' : resource.url })</span>
        </a>
    </div>
  )
}

export default LinkCard