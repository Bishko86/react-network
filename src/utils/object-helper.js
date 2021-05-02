export const updateObjectInArray = (items, objPropName, itemId, newObjProps) => {
  return items.map(item => {
    if (item[objPropName] === itemId) {
      return {
        ...item,
        ...newObjProps
      }
    }
    return item
  })
}

