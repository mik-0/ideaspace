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
    const oldIdeas = [...ideas]
    const newIdeas = [...oldIdeas, {
      ...idea,
      timestamp: Date.now(),
    }];
    // setIdeas(newIdeas)
    setAdding(false)
    saveIdeas(oldIdeas, newIdeas, false)
  }

  const removeIdea = (timestamp) => {
    const idea = ideas.find(idea => idea.timestamp === timestamp);
    if (idea && confirm(`Are you sure you want to delete the idea "${idea.content}"?`) === true) {
      const newIdeas = ideas.filter(idea => idea.timestamp !== timestamp)
      saveIdeas(ideas, newIdeas, false);
    }
  }

  const saveIdeas = async (oldIdeas, newIdeas, doAlert=true) => {

    const pass = prompt('Enter password to save ideas:');
    if (pass == null || pass.length === 0) return;

    setSaving(true)

    const req = await fetch(`${server}/api/ideas`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ideas: newIdeas,
        password: pass
      })
    })

    const ideas = await req.json()

    setSaving(false)

    if (ideas.acknowledged) {
      if (doAlert)
        alert('Ideas saved!')
      
      if (ideas.ideas) {
        setIdeas(ideas.ideas)
      }
    }
    else {
      setIdeas(oldIdeas)

      alert('Error saving ideas: ' + ideas.error ?? JSON.stringify(ideas))
    }
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
          {/* { ideas && ideas.length > 0 && <Button onClick={e => saveIdeas(ideas)}><i className="text-slate-600 fa-solid fa-save"></i>&nbsp; Save</Button> } */}
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
