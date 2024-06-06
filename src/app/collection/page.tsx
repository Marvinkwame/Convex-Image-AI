"use client"

import { useQuery } from 'convex/react'

import React from 'react'
import { api } from '../../../convex/_generated/api'

const CollectionPage = () => {
    const getSketchesDB = useQuery(api.sketches.getSketches)


  return (
    <div>
        <h2>Recent Sketches from users</h2>
        <div className="grid gap-4 grid-cols-4">

        {getSketchesDB?.map((item, index) => (
            <img 
            key={item._id} 
            src={item.result} 
            width='300'
            height="300"
            alt={item.prompt} 
            />
        ))}
        </div>
    </div>
  )
}

export default CollectionPage