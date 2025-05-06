import React from 'react'
import Tree from '@/../Components/Tree/Tree'

const Test2 = () => {

  // Sample tree data
  const childrenData = {
    name: "Deceased",
    children: [
      {
        name: "Son", share: 10,
         children: [
          { name: "Son", share: 30 },
          { name: "Daughter", share: 10 }
        ]
      },
      // { name: "Daughter", share: 30 },
    ]
  };

  const siblingsData = {
    name: "Deceased",
    children: [
      { name: "Real Brother", share: 5 },
      { name: "Wife", share: 10 },
      { name: "Real Sister", share: 5 }
    ]
  };

  const parentsData = {
    name: "Deceased",
    children: [
      {
        name: "Father", share: 10, 
        children: [
          { name: "Father", share: 50 },
          { name: "Mother", share: 10 }
        ]
      },
      {
        name: "Mother", share: 30,
        children: [
          { name: "Mother", share: 5 }
        ]
      },
    ]
  };

  return (
<Tree childrenData={childrenData} parentsData={parentsData} siblingsData={siblingsData}></Tree>
  )
}

export default Test2