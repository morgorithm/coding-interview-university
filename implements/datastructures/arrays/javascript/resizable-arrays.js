class ResizableArray {
  constructor() {
    this._occupiedCapacity = 0
    this._maximumCapacity = 2
    this.resizableArray = new Array(2)
  }

  /**
   * @summary number of items
   */
  size() {
    return this._occupiedCapacity
  }

  /**
   * @summary number of items it can hold
   */
  capacity() {
    return this._maximumCapacity
  }

  /**
   * @summary whether the array is empty or not
   */
  isEmpty() {
    return Boolean(!this._occupiedCapacity)
  }

  /**
   * @summary returns item at given index, blows up if index out of bounds
   * @param {Number} index
   */
  at(index) {
    if (index < 0 || index >= this._occupiedCapacity) {
      throw new Error('Passed index is out of bounds')
    }

    return this.resizableArray[index]
  }

  /**
   * @summary pushes item at the end of the array
   * @param {*} item
   */
  push(item) {
    this.resizableArray[this._occupiedCapacity] = item
    this._occupiedCapacity++

    if (this._maximumCapacity === this._occupiedCapacity) {
      this._resize(2 * this._maximumCapacity)
    }
  }

  /**
   * @summary inserts item at index, shifts that index's value and trailing elements to the right
   * @param {number} index
   * @param {*} item
   */
  insert(index, item) {
    for (let i = this._occupiedCapacity - 1; i >= index; i--) {
      this.resizableArray[i + 1] = this.resizableArray[i]
    }
    this.resizableArray[index] = item
    this._occupiedCapacity++

    if (this._maximumCapacity === this._occupiedCapacity) {
      this._resize(2 * this._maximumCapacity)
    }
  }

  /**
   * @summary can use insert above at index 0
   * @param {*} item
   */
  prepend(item) {
    this.insert(0, item)
  }

  /**
   * @summary remove from end, return value
   */
  pop() {
    const lastValue = this.resizableArray.pop()
    this._occupiedCapacity--

    if (this._maximumCapacity / 4 >= this._occupiedCapacity) {
      this._resize(this._maximumCapacity / 2)
    }

    return lastValue
  }

  /**
   * @summary delete item at index, shifting all trailing elements left
   * @param {number} index
   */
  delete(index) {
    for (let i = index; i < this._occupiedCapacity; i++) {
      if (i === this._occupiedCapacity - 1) {
        delete this.resizableArray[i]
      } else {
        this.resizableArray[i] = this.resizableArray[i + 1]
      }
    }

    this._occupiedCapacity--

    if (this._maximumCapacity / 4 >= this._occupiedCapacity) {
      this._resize(this._maximumCapacity / 2)
    }
  }

  /**
   * @summary looks for value and removes index holding it (even if in multiple places)
   * @param {*} item
   */
  remove(item) {
    for (let i = 0; i < this._occupiedCapacity; i++) {
      if (this.resizableArray[i] === item) {
        this.delete(i)
      }
    }
  }

  /**
   * @summary looks for value and returns first index with that value, -1 if not found
   * @param {*} item
   */
  find(item) {
    let index = -1
    for (let i = 0; i < this._occupiedCapacity; i++) {
      if (this.resizableArray[i] === item) {
        index = i
        break
      }
    }

    return index
  }

  /**
   * @private
   * @description
   *    when you reach capacity, resize to double the size
   *    when popping an item, if size is 1/4 of capacity, resize to half
   * @param {number} newCapacity
   */
  _resize(newCapacity) {
    console.log(`Array capacity is resized from ${this._maximumCapacity}`)
    const _tempResizableArray = new Array(newCapacity)
    for (let i = 0; i < this._occupiedCapacity; i++) {
      _tempResizableArray[i] = this.resizableArray[i]
    }

    this.resizableArray = _tempResizableArray
    this._maximumCapacity = newCapacity
    console.log(`to ${this._maximumCapacity}`)
  }
}

/**
 * TEST CODE SECTION
 */
console.log('Executes test codes')

const resizableArray = new ResizableArray()
console.log('Current size: %d', resizableArray.size())
console.log('Current capacity: %d', resizableArray.capacity())
resizableArray.push(1)
resizableArray.push(2)
resizableArray.push(3)
resizableArray.push(4)
resizableArray.push(5)
console.log('Current size: %d', resizableArray.size())
console.log('Current capacity: %d', resizableArray.capacity())
console.log('Value of at 2 %d', resizableArray.at(2))
resizableArray.delete(2)
console.log('Value of at 2 %d', resizableArray.at(2))
resizableArray.insert(2, 'C')
resizableArray.push('F')
resizableArray.remove(1)
resizableArray.remove(2)
resizableArray.remove(4)
resizableArray.remove(5)
console.log('Current size: %d', resizableArray.size())
console.log('Current capacity: %d', resizableArray.capacity())
resizableArray.prepend('B')
resizableArray.prepend('A')
const idxOfC = resizableArray.find('C')
resizableArray.insert(idxOfC + 1, 'D')
const idxOfD = resizableArray.find('D')
resizableArray.insert(idxOfD + 1, 'E')
