import { Children } from "react";

function capitalizeWords(str) {
  return str
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
    .join(" "); // Join words back together
}

function formatNumber(num) {
  if (num > 1000) {
    return Math.round(num); // Round to nearest integer
  } else if (num > 100) {
    return num.toFixed(1); // Show 1 decimal place
  } else {
    return num.toFixed(2); // Show 2 decimal places
  }
}

function calculatePercentage(value, total) {
  if (total === 0) return 0; // Avoid division by zero
  let percentage = (value / total) * 100;
  return percentage.toFixed(1); // Format with 1 decimal place
}

function treeDataTransformer(data, total_amount) {

  const treeData = {
    parents: { name: 'Deceased' },
    children: { name: 'Deceased' },
    spouse: { name: 'Deceased' },
    siblings: { name: 'Deceased' },
    display: true
  }

  function addChildren() {
    console.log("Inside treeDataTransformer addChildren")
    let children_data = data.filter(heir => heir['category'].includes('children'))

    children_data = children_data.filter(heir => heir['amount'] != 0)

    if (children_data) {

      treeData.children['children'] = []

      for (let child of children_data) {
        treeData.children['children'].push({
          name: capitalizeWords(child["relation"]),
          share: calculatePercentage(child['amount'], total_amount),
          value: child['val']
        });
      }
    }
  }

  function addParents() {
    console.log("Inside treeDataTransformer addParents")
    let parents_data = data.filter(heir => heir['category'].includes('parent'))

    parents_data = parents_data.filter(heir => heir['amount'] != 0)

    if (parents_data) {

      treeData.parents['children'] = []

      for (let parent of parents_data) {
        treeData.parents['children'].push({
          name: capitalizeWords(parent["relation"]),
          share: calculatePercentage(parent['amount'], total_amount),
          value: parent['val']
        });
      }
    }
  }


  function addSiblings() {
    console.log("Inside treeDataTransformer addSiblings")
    let siblings_data = data.filter(heir => heir['category'].includes('sibling'))

    siblings_data = siblings_data.filter(heir => heir['amount'] != 0)

    if (siblings_data) {

      treeData.siblings['children'] = []

      for (let sibling of siblings_data) {
        treeData.siblings['children'].push({
          name: capitalizeWords(sibling["relation"]),
          share: calculatePercentage(sibling['amount'], total_amount),
          value: sibling['val']
        });
      }
    }
  }

  function addSpouse() {
    console.log("Inside treeDataTransformer addSpouse")
    let spouse = data.find(heir => heir['category'].includes('spouse'))

    if (spouse) {

      treeData.spouse['children'] = []

        treeData.spouse['children'].push({
          name: capitalizeWords(spouse["relation"]),
          share: calculatePercentage(spouse['amount'], total_amount),
          value: spouse['val']
        });
      }
    }

  // function addChildren() {
  //   // children = 
  //   console.log("Inside treeDataTransformer addChildren")
  //   // console.log(data.filter(heir => heir['category'].includes('children')))

  //   const children_data = data.filter(heir => heir['category'].includes('children'))

  //   if (children_data.some(heir => ["son's son's son", "son's son's daughter"].includes(heir['relation']))) {
  //     display = false
  //     return -1
  //   }

  //   if (!children_data) {
  //     return -1
  //   }

  //   const son = children_data.find(heir => heir['relation'] === 'son')
  //   const daughter = children_data.find(heir => heir['relation'] === 'daughter')
  //   const son_son = children_data.find(heir => heir['relation'] === "son's son")
  //   const son_daughter = children_data.find(heir => heir['relation'] === "son's daughter")

  //   if (son || daughter || son_son || son_daughter) {

  //     treeData.children['children'] = []

  //     if (son) {
  //       treeData.children['children'].push({
  //         name: 'Son',
  //         share: calculatePercentage(son['amount'], total_amount),
  //         value: son['val']
  //       })
  //     }

  //     if (daughter) {
  //       treeData.children['children'].push({
  //         name: 'Daughter',
  //         share: calculatePercentage(daughter['amount'], total_amount)
  //         ,
  //         value: daughter['val']
  //       })
  //     }

  //     if ((son_daughter || son_son) && son) {

  //       treeData.children['children'][0]['children'] = []

  //       if (son_son) {
  //         treeData.children['children'][0]['children'].push({
  //           name: 'Son',
  //           share: calculatePercentage(son_son['amount'], total_amount)
  //           ,
  //           value: son_son['val']
  //         })
  //       }

  //       if (son_daughter) {
  //         treeData.children['children'][0]['children'].push({
  //           name: 'Daugther',
  //           share: calculatePercentage(son_daughter['amount'], total_amount),
  //           value: son_daughter['val']
  //         })
  //       }

  //     } else {

  //       if (son_son) {
  //         treeData.children['children'][0]['children'].push({
  //           name: "Son's Son",
  //           share: calculatePercentage(son_son['amount'], total_amount)
  //           ,
  //           value: son_son['val']
  //         })
  //       }

  //       if (son_daughter) {
  //         treeData.children['children'][0]['children'].push({
  //           name: "Son's Daugther",
  //           share: calculatePercentage(son_daughter['amount'], total_amount),
  //           value: son_daughter['val']
  //         })
  //       }
  //     }
  //   }
  // }

  // // function addParents() {
  // //   // children = 
  // //   console.log("Inside treeDataTransformer addParents")
  // //   // console.log(data.filter(heir => heir['category'].includes('children')))

  // //   if (treeData.display === false) {
  // //     return -1
  // //   }

  // //   const parents_data = data.filter(heir => heir['category'].includes('parent'))


  // //   if (!parents_data) {
  // //     return -1
  // //   }

  // //   const father = parents_data.find(heir => heir['relation'] === 'father')
  // //   const mother = parents_data.find(heir => heir['relation'] === 'mother')
  // //   const father_father = parents_data.find(heir => heir['relation'] === "father's father")
  // //   const father_mother = parents_data.find(heir => heir['relation'] === "father's mother")
  // //   const mother_mother = parents_data.find(heir => heir['relation'] === "mother's mother")
  // //   const father_father_father = parents_data.find(heir => heir['relation'] === "father's father's father")


  // //   if (father_father_father || father || mother || father_father || father_mother || mother_mother) {

  // //     treeData.parents['children'] = []

  // //     if (father) {
  // //       treeData.parents['children'].push({
  // //         name: 'Father',
  // //         share: calculatePercentage(father['amount'], total_amount),
  // //         value: father['val']
  // //       })
  // //     } else if (father_father) {
  // //       treeData.parents['children'].push({
  // //         name: "Father's Father",
  // //         share: calculatePercentage(father_father['amount'], total_amount),
  // //         value: father_father['val']
  // //       })
  // //     } else if (father_father_father) {
  // //       treeData.parents['children'].push({
  // //         name: "Father's Father's Father",
  // //         share: calculatePercentage(father_father_father['amount'], total_amount),
  // //         value: father_father_father['val']
  // //       })
  // //     }

  // //     if (father_mother && !mother && !father) {
  // //       treeData.parents['children'].push({
  // //         name: "Father's Mother",
  // //         share: calculatePercentage(father_mother['amount'], total_amount),
  // //         value: father_mother['val']
  // //       })
  // //     }

  // //     if (mother) {
  // //       treeData.parents['children'].push({
  // //         name: 'Mother',
  // //         share: calculatePercentage(mother['amount'], total_amount)
  // //         ,
  // //         value: mother['val']
  // //       })
  // //     } else if (mother_mother) {
  // //       treeData.parents['children'].push({
  // //         name: "Mother's Mother",
  // //         share: calculatePercentage(mother_mother['amount'], total_amount)
  // //         ,
  // //         value: mother_mother['val']
  // //       })
  // //     }
  // //   }
  // // }

  // // function addSpouse() {
  // //   // children = 
  // //   console.log("Inside treeDataTransformer addSpouse")
  // //   // console.log(data.filter(heir => heir['category'].includes('children')))

  // //   if (treeData.display === false) {
  // //     return -1
  // //   }

  // //   const spouse = data.find(heir => heir['category'].includes('spouse'))

  // //   if (!spouse) {
  // //     return -1
  // //   }

  // //   treeData.spouse['children']=[]

  // //   if (spouse['relation'] === 'husband') {
  // //     treeData.spouse['children'].push({
  // //       name: 'Husband',
  // //       share: calculatePercentage(spouse['amount'], total_amount),
  // //       value: spouse['val']
  // //     })
  // //   } else {
  // //     treeData.spouse['children'].push({
  // //       name: 'Wife',
  // //       share: calculatePercentage(spouse['amount'], total_amount),
  // //       value: spouse['val']
  // //     })
  // //   }
  // // }

  // // function addSiblings() {
  // //   // children = 
  // //   console.log("Inside treeDataTransformer addSiblings")
  // //   // console.log(data.filter(heir => heir['category'].includes('children')))

  // //   if (treeData.display === false) {
  // //     return -1
  // //   }

  // //   if (data.some(heir => ['son', "son's son" ,"son's son's son"].includes(heir['relation']))) {
  // //     return -1
  // //   }

  // //   if (data.some(heir => ['father', "father's father"].includes(heir['relation']))) {
  // //     return -1
  // //   }

  // //   const siblings_data = data.filter(heir => heir['category'].includes('sibling'))

  // //   if (!siblings_data) {
  // //     return -1
  // //   }


  // //   const real_brother = siblings_data.find(heir => heir['relation'] === 'real brother')

  // //   const real_sister = siblings_data.find(heir => heir['relation'] === 'real sister')

  // //   const paternal_sister = siblings_data.find(heir => heir['relation'] === 'paternal sister')    

  // //   const paternal_brother = siblings_data.find(heir => heir['relation'] === 'paternal brother')

  // //   if(real_brother||real_sister||paternal_sister||paternal||brother){


  // //   }
  // //   if (son) {
  // //     treeData.children['children'].push({
  // //       name: 'Son',
  // //       share: calculatePercentage(son['amount'], total_amount),
  // //       value: son['val']
  // //     })
  // //   }

  // //   if (spouse['relation'] === 'husband') {
  // //     treeData.spouse['children'].push({
  // //       name: 'Husband',
  // //       share: calculatePercentage(spouse['amount'], total_amount),
  // //       value: spouse['val']
  // //     })
  // //   } else {
  // //     treeData.spouse['children'].push({
  // //       name: 'Wife',
  // //       share: calculatePercentage(spouse['amount'], total_amount),
  // //       value: spouse['val']
  // //     })
  // //   }
  // // }


  addChildren()
  addParents()
  addSiblings()
  addSpouse()

  // console.log("Inside treeDataTransformer")

  // console.log(data)
  // console.log(treeData)

  return treeData
}

export { formatNumber, capitalizeWords, calculatePercentage, treeDataTransformer };
