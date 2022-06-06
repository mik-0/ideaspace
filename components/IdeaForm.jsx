import React from 'react'
import Button from './Button';

const IdeaForm = ({ onAdd, onClose }) => {

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [resources, setResources] = React.useState([]);

    const addResource = () => {
        setResources([...resources, { type: 'link', text: '', url: '' }]);
    }

    const editResource = (index, prop, value) => {
        const newResources = [...resources];
        newResources[index][prop] = value;
        setResources(newResources);
    }

    const removeResource = (index) => {
        const newResources = [...resources];
        newResources.splice(index, 1);
        setResources(newResources);
    }

    const validate = () => {
        if (title.length === 0 || title.length > 100)
            throw new Error('Title must be between 1 and 100 characters');
        
        if (description.length === 0 || description.length > 500)
            throw new Error('Description must be between 1 and 500 characters');
        
        for (const resource of resources) {
            if (resource.text.length === 0 || resource.text.length > 100)
                throw new Error('Resource text must be between 1 and 100 characters');
            if (resource.url.length === 0 || resource.url.length > 500)
                throw new Error('Resource url must be between 1 and 500 characters');
        }

        return true;
    }
        
    const submit = () => {
        try {
            validate();
            onAdd({
                content: title, description, resources,
            });
        }
        catch (e) {
            alert(e.message);
        }
    }


    return (
        <div className='mt-28 sm:mt-20 relative h-auto'>
            <div className='ideaForm w-[95%] sm:w-[50%]'>
                <form className='max-h-[600px] overflow-y-auto p-5 bg-white/[85%] rounded'>
                    <div className="flex items-center mb-4">
                        <h1 className='flex-grow text-2xl font-medium'>New Idea</h1>
                        <i onClick={() => onClose()} className="cursor-pointer text-slate-600 fa-solid fa-times"></i>
                    </div>
                    <div>
                        <label htmlFor="content">Idea title</label><br />
                        <input
                            className='mt-1 w-full rounded py-1 px-2'
                            id="content"
                            name="content"
                            type="text"
                            onChange={ (e) => setTitle(e.target.value) }
                            placeholder="What's your idea?"
                        />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="content">Description</label><br />
                        <textarea
                            className='mt-1 w-full rounded py-1 px-2 resize-none'
                            id="description"
                            name="description"
                            rows={5}
                            onChange={(e) => { setDescription(e.target.value) }}
                            placeholder="Describe your idea"
                        ></textarea>
                    </div>
                    {
                        resources.map((resource, index) => (
                            <div key={index} className='mt-3'>
                                <div className="flex">
                                    <div className="mr-2">
                                        <label htmlFor="content">Resource {index + 1}</label>
                                    </div>
                                    <div>
                                        <button className='ml-2' onClick={() => removeResource(index)}>
                                            <i className="text-red-600 fa-solid fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                                <select className='mt-2 rounded py-2 px-3' name="" id="" onChange={(e) => {
                                        editResource(index, 'type', e.target.value);
                                    }}>
                                    <option value="link">Link</option>
                                </select>
                                <input
                                    className='mt-1 w-full rounded py-2 px-3'
                                    type="text"
                                    onChange={(e) => {
                                        editResource(index, 'text', e.target.value);
                                    }}
                                    placeholder="Resource Title"
                                />
                                <input
                                    className='mt-1 w-full rounded py-2 px-3'
                                    type="url"
                                    onChange={(e) => {
                                        editResource(index, 'url', e.target.value);
                                    }}
                                    placeholder="Resource URL"
                                />
                            </div>
                        ))
                    }
                    <div className='mt-1'>
                        <Button onClick={() => addResource()} className="mt-3 text-slate-800"><i style={{ fontSize: '0.9rem' }}  className='fa-solid fa-link mr-2'></i>Add Resource</Button>
                    </div>

                    <Button onClick={() => submit()} className="mt-3 text-slate-800"><i className="text-slate-600 fa-solid fa-plus mr-2"></i>&nbsp;Add Idea</Button>
                    
                </form>
            </div>
        </div>
    );
}

export default IdeaForm