import React, { useEffect } from 'react'
import { Cat} from 'react-kawaii'
import { useSelector, useDispatch, batch } from 'react-redux'
import { updateMood, MOODS, getMoods, updateCatMood, updateCatSize, updateCatColor, setColor } from './mood'
import { SketchPicker } from 'react-color'

function App() {
  const currentMood = useSelector((state) => state.mood)
  const currentSize = useSelector((state) => state.size)
  const currentColor = useSelector((state) => state.color)
  const dispatch = useDispatch()


  const handleMoodUpdate = (event) => {
    const mood = event.target.dataset.type
    // dispatch(updateMood(mood))
    dispatch(updateCatMood(mood))
  }

  const handleSize = (operator) => {
    dispatch(updateCatSize(operator))
  }

  const handleColor = (color) => {
    dispatch(updateCatColor(color.hex))
    // console.log(color.hex);
    // setColor(color.hex)
  }

 useEffect(()=>{
  batch(()=> {
    dispatch(getMoods())
  })
 }, []) 
 

  return (
    <div className='App'>
      <Cat size={currentSize} mood={currentMood} color= {currentColor} />
      <h2>Mood</h2>
      <section>
        {Object.values(MOODS).map((mood) => (
          <button key={mood} data-type={mood} onClick={handleMoodUpdate}>
            {mood}
          </button>
        ))}
      </section>
      <h2>Size</h2>
      <section>
          <button
            onClick={() => handleSize("+")}>
          +</button>
          <button
            onClick={() => handleSize("-")}>
          -</button>
      </section>
      <h2>Color</h2>
      <section>
          <SketchPicker
            color={currentColor}
            onChangeComplete={handleColor}
          />
      </section>
    </div>
  )
}

export default App