export async function getMeals(updateMeals, updateError, url='https://react-http-ae815-default-rtdb.europe-west1.firebasedatabase.app/meals.json'){
  try{
    const response = await fetch(url);
    if(!response.ok){
      throw new Error('Error Getting Data')
    }
    else if(response.ok){
      const data = await response.json()
      let meals = []
      for (let meal in data){
        meals.push(data[meal])
      }
      if(meals !== null && meals.length > 0 ){
        updateMeals(meals)
      }
      else{
        throw new Error('Error Getting Data')
      }
    }
    
  }
  catch(err){
    updateError(err.message)
  }
}

export async function updateCart(updateFunction, updateError, cart, url='https://react-http-ae815-default-rtdb.europe-west1.firebasedatabase.app/cart.json'){
  const putResponse = await fetch(url, {
    method:"PUT",
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cart)
  })
  if(putResponse.status === 200){
    try{
      const response = await fetch(url);
      if(!response.ok){
        throw new Error('Error Getting Data')
      }
      else if(response.ok){
        const data = await response.json()
        let meals = []
        for (let meal in data){
          meals.push(data[meal])
        }
        if(meals !== null && meals.length > 0 ){
          updateFunction(meals)
        }
        else{
          updateFunction([])
          throw new Error('Error Getting Data')
        }
      }
      
    }
    catch(err){
      updateError(err.message)
    }
  }
}

export async function putCart(cart , url='https://react-http-ae815-default-rtdb.europe-west1.firebasedatabase.app/cart.json'){
  await fetch(url, {
    method:"PUT",
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cart)
  })
}