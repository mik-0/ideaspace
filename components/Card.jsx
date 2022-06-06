import React from 'react'
import AnimateHeight from 'react-animate-height';
import LinkCard from './LinkCard';

const Card = ({ timestamp, content, description, resources, onDelete }) => {

    const [isOpen, setIsOpen] = React.useState(false);
    const [height, setHeight] = React.useState(0);

    const [menuOpen, setMenuOpen] = React.useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
        setHeight(isOpen ? 0 : 'auto');
    }

    return (
        <div className='text-slate-600 c-gradient font-normal text-lg mb-3 shadow rounded-md'>
            <div className='relative rounded-tl rounded-tr select-none flex gap-4 items-center cursor-pointer py-3 px-5 hover:bg-slate-200 transition-all' onClick={() => toggle()}>
                <i style={{ fontSize: '0.9rem' }} className={`fa-solid fa-chevron-right transition-all ${ isOpen ? 'rotate-90' : ''}`}></i>
                <p className='font-base flex-grow'>{content}</p>
                <div onClick={(e) => { setMenuOpen(!menuOpen); e.stopPropagation(); }} className='hover:brightness-50'>
                    <i className="fa-solid fa-gear"></i>
                </div>
                {
                    menuOpen && (
                        <div className='absolute z-50 right-0 top-[50px]'>
                            <div className='bg-white rounded-md shadow-md'>
                                <div className='flex flex-col items-center p-2'>
                                    <div onClick={() => onDelete(timestamp)} className='hover:bg-slate-50 transition-colors py-4 w-full items-center justify-center flex gap-2'>
                                        <i className="fa-solid fa-trash-alt"></i>
                                        <p className='text-sm text-slate-600'>Delete</p>
                                    </div>
                                    <div className='hover:bg-slate-50 text-slate-400 transition-colors py-4 w-full items-center justify-center flex gap-2'>
                                        <i className="fa-solid fa-edit"></i>
                                        <p className='text-sm'>Edit (coming soon)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div> 
            <AnimateHeight duration={500} height={height} >
            {
                    <div className='py-3 px-5'>
                        <div className='mt-2'>
                            <p className='text-base text-slate-500'>{description}</p>
                        </div>
                        <div className=''>
                            {resources && resources.length > 0 && (<p className='text-base font-medium mt-5 mb-2'>Resources</p>)}
                            <div className="flex gap-2 flex-wrap">
                                {resources && resources.map((resource, index) => (
                                    <LinkCard key={index} resource={resource} />
                                ))}
                            </div>
                        </div>
                        <p className='mt-3 text-slate-400 text-base'>{new Date(timestamp).toLocaleString()}</p>
                    </div>
            }
            </AnimateHeight>
        </div>
    )
}

Card.defaultProps = {
    content: 'Example content',
    description: 'Example description',
    resources: [{
        type: 'link',
        url: 'https://www.google.com',
        text: 'Google'
    }, {
        type: 'link',
        url: 'https://www.youtube.com',
        text: 'YouTube'
    }, {
        type: 'link',
        url: 'https://www.instagram.com',
        text: 'Instagram'
    }, {
        type: 'link',
        url: 'https://www.google.com',
        text: 'Google'
    }, {
        type: 'link',
        url: 'https://www.google.com',
        text: 'Google'
    }]
}

export default Card