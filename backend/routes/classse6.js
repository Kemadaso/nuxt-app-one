
class something  {

  static some
  constructor(mi = null) {
    this.prop = mi
    console.log('init constructor class something')
  }

  static instance() {
      if(!something.some) {
        something.some = new something(123)
      }
      return something.some
  }

  hello() {
    console.log('hello method')
  }

  static aea() {
    console.log('mi static method')
  }

}

module.exports = something