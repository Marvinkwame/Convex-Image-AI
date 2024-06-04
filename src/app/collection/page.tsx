"use client"

import { useQuery } from 'convex/react'

import React from 'react'
import { api } from '../../../convex/_generated/api'

const CollectionPage = () => {
    const getSketchesDB = useQuery(api.sketches.getSketches)
  return (
    <div>
        {getSketchesDB?.map((item, index) => (
            <p key={item._id}>{item.prompt}</p>
        ))}
    </div>
  )
}

export default CollectionPage