import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Card from '../components/Card'
import Button from '../components/Button'
import React from 'react'
import IdeaForm from '../components/IdeaForm'

import { server } from '../config'

export default function Home({ _ideas }) {

  const [ideas, setIdeas] = React.useState([])
  const [saving, setSaving] = React.useState(false)
  const [adding, setAdding] = React.useState(false)
  
  
  const fetchIdeas = async () => {
    const req = await fetch(`${server}/api/ideas`)
    const ideas = await req.json()
    return ideas
  }

  // useEffect
  React.useEffect(() => {
    console.log('fetching ideas');
    fetchIdeas().then(fetchedIdeas => {
      setIdeas(fetchedIdeas);
    })
  }, [])

  const addIdea = (idea) => {
    setIdeas([...ideas, {
      ...idea,
      timestamp: Date.now(),
    }])

    setAdding(false)
  }

  const removeIdea = (timestamp) => {
    setIdeas(() => {
      const newIdeas = ideas.filter(idea => idea.timestamp !== timestamp)
      saveIdeas(newIdeas, false);
      return newIdeas;
    })
  }

  const saveIdeas = async (__ideas, doAlert=true) => {

    setSaving(true)

    const req = await fetch(`${server}/api/ideas`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(__ideas)
    })

    const ideas = await req.json()

    if (ideas.acknowledged) {
      if (doAlert)
        alert('Ideas saved!')
    }
    else {
      alert('Error saving ideas: ' + JSON.stringify(ideas))
    }

    setSaving(false)

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>IdeaSpace</title>
        <meta name="description" content="Web-app to keep track of your ideas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='mx-auto sm:max-w-[60%]'>
        <div className='mt-10'>
          <h1 className='text-gradient mb-4 text-4xl font-libre font-bold'>IdeaSpace</h1>
          <div className='rounded w-[150px] opacity-50 h-[3px] m-gradient block'></div>
        </div>

        <div className='mt-4 flex gap-2 items-center'>
          <Button onClick={() => setAdding(true)}><i className="text-slate-600 fa-solid fa-plus"></i>&nbsp; Add</Button>
          { ideas && ideas.length > 0 && <Button onClick={e => saveIdeas(ideas)}><i className="text-slate-600 fa-solid fa-save"></i>&nbsp; Save</Button> }
          { saving && <i className="ml-4 fa-solid fa-floppy-disk"></i> }
        </div>

        <div className='mt-4'>
          {
            ideas && ideas.length > 0 ?
              (ideas.map((idea, index) => (
                <Card key={index} onDelete={removeIdea} timestamp={idea.timestamp} content={idea.content} description={idea.description} resources={idea.resources} />
              )))
              : <p className='mt-5 text-slate-700 text-xl'>No ideas yet. Press the &apos;Add&apos; button to add a new Idea!</p>
          }

          { ideas && ideas.length > 0 && (<p className='text-slate-500'>Don&apos;t forget to save after making any changes!</p>)}
        </div>
        {
          adding && (
            <>
              <div className='absolute top-0 left-0 h-full w-full bg-black/50'></div>
              <IdeaForm onAdd={addIdea} onClose={() => setAdding(false) } />
            </>
          )
        }
      </div>
    </div>
  )
}