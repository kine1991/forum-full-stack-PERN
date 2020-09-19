import React/*, { useState, useEffect }*/ from 'react'

// function useLogger(value) {
//   useEffect(() => {
//     console.log('V', value)
//   }, [value])
// }

// function useInput(initialValue) {
//   const [value, setValue] = useState(initialValue)
//   useEffect(() => {
//     console.log('V', value)
//   }, [value])

//   return {

//   }
// }

const Test = ({term}) => {
  // const input = useInput('')
  // const [name, setName] = useState('')

  // const handleChange = e => {
  //   setName(e.target.value)
  // }

  React.useEffect(() => {
    console.log('term', term)
  }, [term])

  // useLogger(name)
  return (
    <div>ss
      {/* <input type="text" value={name} onChange={handleChange}/> */}
    </div>
  )
}

export default Test;


// import React, {useState, useCallback} from 'react'
// import ItemsList from './ItemsList'

// function App() {
//   const [colored, setColored] = useState(false)
//   const [count, setCount] = useState(1)

//   const styles = {
//     color: colored ? 'darkred' : 'black'
//   }

//   const generateItemsFromAPI = () => {
//     return new Array(count).fill('').map((_, i) => `Элемент ${i/* + indexNumber*/}`)
//   }
//   // const generateItemsFromAPI = useCallback((indexNumber) => {
//   //   return new Array(count).fill('').map((_, i) => `Элемент ${i/* + indexNumber*/}`)
//   // }, [count])

//   return (
//     <>
//       <h1 style={styles}>Количество элементов: {count}</h1>
//       <button className={'btn btn-success'} onClick={() => setCount(prev => prev + 1)}>Добавить</button>
//       <button className={'btn btn-warning'} onClick={() => setColored(prev => !prev)}>Изменить</button>

//       <ItemsList getItems={generateItemsFromAPI} />
//     </>
//   )
// }

// export default App
