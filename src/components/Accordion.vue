<template>
  <div class="hello">
    <div class="accordion-container">
      <div class="search-container">
        <input @click="collapseLast" v-model="search"  placeholder="Filter Results" type="text" name="search" id="search"/>
        <div class="filter-button"><div class="order-icon"></div></div>
      </div>
      <div v-if="filteredItems.length == 0" class="no-results"><h4>No Results</h4></div>
      <div class="services-container">
        <div class="services-container-right">
          <ul>
            <li 
            class="list-item"
            v-for="(i, index) in filteredItems" 
            v-bind:key="index" 
            :id="'item'+index" @click="dropdown(index)" 
            :class="(index != 0 ? '' : 'first-service')">
              <span><strong style='opacity: 0.4; color: green'>{{ '$' + i.price }}</strong>{{ i.name }}<b :class="( droppable[index] == true ? 'right' : 'up' )"></b></span>
              <div 
              :class="( 
                droppable[index] == true ? 
                'droppable dropped' : 
                'droppable collapsed' 
                )">
                <div class="bubble-items">
                      <strong>{{ i.type }}</strong>
                      <p>{{ i.description }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Accordion',
  props: {
    msg: String
  },
  data() {
    return {
      droppable: [],
      items: [],
      search: '',
      activeDrop: null
    }
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => {
        return item.name.toLowerCase().match(this.search.toLowerCase()); //when search matches description, expand that item
      });
    }
  },
  methods: {
    dropdown(context) {
      console.log('dropping down panel ' + context);
      for(let i = 0; i < this.droppable.length; i++) {
        this.droppable[i] = ( i != context ? false : ( this.droppable[i] == true ? false : true ));
      }
      this.activeDrop = context;
      console.log(this.droppable);
    },
    collapseLast() {
      this.droppable[this.activeDrop] = false;
    },
    async fetchData() {
      await firebase.firestore().collection('menu').orderBy('name').get().then((docs) => {
        docs.forEach((doc) => {
          this.items.push(doc.data());
          this.droppable.push(false);
        });
      });
    }
  }
}
</script>

<style scoped lang="scss">

.no-results {
  margin-top: 48px;
}

.search-container {
  display: flex;
  background: white;
  border-radius: 80px;
  align-items: center;

  #search {
    width: calc(100% - 48px);
    border: none;
    padding: 18px 0px 18px 24px;
    text-align: left;
    border-radius: 36px;
    font-size: 14px;
    
    &:focus {
      outline: none;
    }
  }

  .filter-button {
    background: #eee;
    border-radius: 100%;
    height: 36px;
    width: 36px;
    margin-right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 200ms;
    cursor: pointer;

    .order-icon {
      background-image: url('../assets/icons/filter_list-24px.svg');
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      width: 18px;
      height: 18px;
    }

    &:hover {
      filter: invert(1);
    }
  }
}

.list-item {
  display: block !important;
}

#item1 {
  border: none !important;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  //display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.hello {
  justify-content: center;
  display: flex;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0px;
  align-items: center;
  z-index: -1;
}

.accordion-container {
  //margin-top: 120px;
}

.services-container {
  background: white;
  height: max-content;
  width: 40vw;
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  border-radius: 24px;
  padding: 0px;

  .service-icon {
    //background: black;
    //opacity: 0.2;
    display: none;
    height: 32px;
    width: 32px;
    margin-right: 24px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  .bubble-items {
    text-align: center;
    width: 92%;
    margin-left: 0px;
    padding-top: 36px;
    transition: 300ms;
    color: #bbb;

    span {
      margin-right: 4px;
      color: black;
      background: #eee;
      padding: 4px 8px;
      line-height: 1;
      font-size: 12px;
      border-radius: 12px;
      display:inline-block;
      margin-bottom: 6px;
      font-weight: bold;

      span {
        padding: 0px;
        margin: 0px;
        color: transparent;
      }
    }
  }

  ul {
    margin: 0px;
    padding: 0px;
    list-style: none;

    .droppable {
      width: 100%;
      height: 0px;
      //background: black;
      color: black !important;
      margin-top: 24px;
      transition: 300ms;
      pointer-events: none;
    }

    .dropped {
      //background: pink;
      height: 200px;
      pointer-events: none;
      //background: green;
      //padding-top: 24px;

      .bubble-items {
        transition-delay: 100ms;
        //background: pink;
        opacity: 1;
      }
    }

    .collapsed {
      //background: gray;
      height: 0px;
      //opacity: 0%;
      pointer-events: none;
      //padding-top: 1px;
      
      .bubble-items {
        //background: red;
        opacity: 0;
        transition: 100ms;
      }
    }
    
    li {
      padding: 24px 0px 0px 24px;
      //border: 1px solid black;
      cursor: pointer;
      //border-top: 1px #e0e0e0 solid;
      //display: flex;
      //justify-content: center;
      //align-items: center;

      span {
        //color: red;
        font-size: 14px;
        //text-transform: uppercase;
        font-weight: bold;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 100ms;

        b {
          margin-right: 24px;
          height: 12px;
          width: 12px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          background-image: url('../assets/icons/arrow-down.png');
        }
      }

      &:hover {
        span {
          b {
            color: black !important;
          }
        }
      }
    }
  }

  .service-par {
    font-size: 14px;
  }

  h1 {
    font-size: 48px;
    font-weight: normal;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  p {
    width: 85%;
  }

  .services-container-left {
    //background: red;
    width: 800px;
  }

  .services-container-right {
    //background: orange;
    width: 100%;
  }
}

.right {
  transform: rotate(180deg);
  transition: 300ms;
}

.up {
  transform: rotate(0deg);
  transition: 300ms;
}
</style>
