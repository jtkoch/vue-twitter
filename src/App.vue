<template>
  <div id="app" class="flex container h-screen w-full">

    <!-- side nav -->
    <div class="lg:w-1/5 border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between">
      <div>
        <button class="h-12 w-12 hover:bg-lightblue text-3xl rounded-full text-blue">
          <i class="fab fa-twitter"></i>
        </button>
        <div>
          <button v-for="tab in tabs" v-bind:key="tab" @click="id = tab.id" 
            :class="`focus:outline-none hover:text-blue flex items-center py-2 px-4 hover:bg-lightblue rounded-full mr-auto mb-3 ${ id === tab.id ? 'text-blue' : '' }`">
            <i :class="`${tab.icon} text-2xl mr-4 text-left`"></i>
            <p class="text-lg font-semibold text-left hidden lg:block"> {{ tab.title }} </p>
          </button>
        </div>
        <button class="text-white bg-blue rounded-full font-semibold focus:outline-none w-12 h-12 lg:h-auto lg:w-full p-3 hover:bg-darkblue">
          <p class="hidden lg:block">Tweet</p>
          <i class="fas fa-plus lg:hidden"></i>
        </button>
      </div>

      <!-- dropdown -->
      <div class="w-full relative">
        <button @click="dropdown = true" class="flex items-center w-full hover:bg-lightblue rounded-full p-2 focus:outline-none">
          <img src="profile.jpg" class="w-10 h-10 rounded-full" />
          <div class="hidden lg:block ml-4">
            <p class="text-sm font-bold leading-tight"> Jensen Koch </p>
            <p class="text-sm leading-tight"> @JKoch </p>
          </div>
          <i class="hidden lg:block fas fa-angle-down ml-auto text-lg"></i>
        </button>
        <div v-if="dropdown === true" class="absolute bottom-0 left-0 w-64 rounded-lg shadow-md border-lightest bg-white mb-16">
          <button @click="dropdown = false" class="p-3 flex items-center w-full hover:bg-lightest p-2 focus:outline-none">
            <img src="profile.jpg" class="w-10 h-10 rounded-full" />
            <div class="ml-4">
              <p class="text-sm font-bold leading-tight"> Jensen Koch </p>
              <p class="text-sm leading-tight"> @JKoch </p>
            </div>
            <i class="fas fa-check ml-auto text-blue"></i>
          </button>
          <button @click="dropdown = false" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 text-sm focus:outline-none">
            Add an existing account
          </button>
          <button @click="dropdown = false" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 text-sm focus:outline-none">
            Log out @JKoch
          </button>
        </div>
      </div>
    </div>

    <!-- tweets -->
    <div class="w-1/2 h-full overflow-y-scroll">
      <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
        <h1 class="text-xl font-bold">Home</h1>
        <i class="far fa-star text-xl text-blue"></i>
      </div>
      <div class="px-5 py-3 border-b-8 border-lighter flex">
        <div>
          <img src="profile.jpg" class="w-12 h-12 rounded-full" />
        </div>
        <form v-on:submit.prevent="addNewTweet"  class="w-full px-4 relative">
          <textarea v-model="tweet.content" placeholder="What's up?" class="w-full mt-3 pb-3 focus:outline-none"/>
          <div class="flex items-center">
            <i class="text-lg text-blue mr-4 far fa-image"></i>
            <i class="text-lg text-blue mr-4 fas fa-film"></i>
            <i class="text-lg text-blue mr-4 far fa-chart-bar"></i>
            <i class="text-lg text-blue mr-4 far fa-smile"></i>
          </div>
          <button type="submit" class="h-10 px-4 text-white rounded-full font-semibold bg-blue hover:bg-darkblue focus:ouline-none absolute bottom-0 right-0">
            Tweet
          </button>
        </form>
      </div>

      <div class="flex flex-col-reverse">
        <div v-for="tweet in tweets" v-bind:key="tweet" class="w-full p-4 border-b hover:bg-lighter flex">
          <div class="flex-none mr-4">
            <img src="profile.jpg" class="h-12 w-12 rounded-full flex-none"/>
          </div>
          <div class="w-full">
            <div class="flex items-center w-full">
              <p class="font-semibold"> Jensen Koch </p>
              <p class="text-sm text-dark ml-2"> @JKoch </p>
              <p class="text-sm text-dark ml-2"> 1 sec </p>
              <i class="fas fa-angle-down text-dark ml-auto"></i>
            </div>
            <p class="py-2">
              {{ tweet.content }}
            </p>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center text-sm text-dark">
                <i class="far fa-comment mr-3"></i>
                <p> 0 </p>
              </div>
              <div class="flex items-center text-sm text-dark">
                <i class="fas fa-retweet mr-3"></i>
                <p> 0 </p>
              </div>
              <div class="flex items-center text-sm text-dark">
                <i class="fas fa-heart mr-3"></i>
                <p> 1 </p>
              </div>
              <div class="flex items-center text-sm text-dark">
                <i class="fas fa-share-square mr-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-for="follow in following" v-bind:key="follow" class="w-full p-4 border-b hover:bg-lighter flex">
        <div class="flex-none mr-4">
          <img :src="`${follow.src}`" class="h-12 w-12 rounded-full flex-none" />
        </div>
        <div class="w-full">
          <div class="flex items-center w-full">
            <p class="font-semibold"> {{follow.name}} </p>
            <p class="text-sm text-dark ml-2"> {{follow.handle}} </p>
            <p class="text-sm text-dark ml-2"> {{follow.time}} </p>
            <i class="fas fa-angle-down text-dark ml-auto"></i>
          </div>
          <p class="py-2">
            {{follow.tweet}}
          </p>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center text-sm text-dark">
              <i class="mr-3 far fa-comment"></i>
              <p> {{follow.comments}} </p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="mr-3 fas fa-retweet mr-3"></i>
              <p> {{follow.retweets}} </p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="mr-3 fas fa-heart"></i>
              <p> {{follow.like}} </p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="mr-3 fas fa-share-square"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- trending -->
    <div class="md:block hidden w-1/3 h-full border-l border-lighter py-2 px-6 overflow-y-scroll relative">
      <input class="pl-12 rounded-full w-full p-2 bg-lighter text-sm mb-4" placeholder="Search Twitter" />
      <i class="fas fa-search absolute left-0 top-0 mt-5 ml-12 text-sm text-light"></i>
      <div class="w-full rounded-lg bg-lightest">
        <div class="flex items-center justify-between p-3">
          <p class="text-lg font-bold">Trends for You</p>
          <i class="fas fa-cog text-lg text-blue"></i>
        </div>
        <button v-for="trend in trending" v-bind:key="trend" class="w-full flex justify-between hover:bg-lighter p-3 border-t border-lighter focus:outline-none">
          <div>
            <p class="text-sm text-left leading-tight text-dark">{{ trend.top }}</p>
            <p class="font-bold text-left leading-tight">{{ trend.title }}</p>
            <p class="text-left leading-tight text-dark">{{ trend.bottom }}</p>
          </div>
          <i class="fas fa-angle-down text-lg text-dark"></i>
        </button>
        <button class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter focus:outline-none">
          Show More
        </button>
      </div>

      <div class="w-full rounded-lg bg-lightest my-4">
        <div class="p-3">
          <p class="text-lg font-bold">Who to follow</p>
        </div>
        <button v-for="friend in friends" v-bind:key="friend" class="w-full flex hover:bg-lighter p-3 border-t border-lighter focus:outline-none">
          <img :src="`${friend.src}`" class="w-12 h-12 rounded-full" />
          <div class="hidden lg:block ml-4">
            <p class="text-sm font-bold leading-tight"> {{friend.name}} </p>
            <p class="text-sm leading-tight"> {{friend.handle}} </p>
          </div>
          <button class="ml-auto text-sm text-blue py-1 px-4 rounded-full border-2 border-blue focus:outline-none">
            Follow
          </button>
        </button>
        <button class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter focus:outline-none">
          Show More
        </button>
      </div>
    </div>


  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      tabs: [
        {icon: 'fas fa-home', title: 'Home', id:'home'},
        {icon: 'fas fa-hashtag', title: 'Explore', id: 'explore'},
        {icon: 'far fa-bell', title: 'Notifications', id: 'notifications'},
        {icon: 'far fa-envelope', title: 'Messages', id: 'messages'},
        {icon: 'far fa-bookmark', title: 'Bookmarks', id: 'bookmarks'},
        {icon: 'fas fa-clipboard-list', title: 'Lists', id: 'lists'},
        {icon: 'far fa-user', title: 'Profile', id: 'profile'},
        {icon: 'fas fa-ellipsis-h', title: 'More', id: 'more'}
      ],
      id: 'home',
      dropdown: false, 
      trending: [
        {top: 'Trending in TX', title: 'Gigi', bottom: 'Trending with: Rip Gigi'},
        {top: 'Music', title: 'We Won', bottom: '135K Tweets'},
        {top: 'Pop', title: 'Blue Ivy', bottom: '40k tweets'},
        {top: 'Trending in US', title: 'Denim Day', bottom: '40k tweets'},
        {top: 'Trending', title: 'When Beyonce', bottom: '25.4k tweets'},
      ],
      friends: [
        {src: 'emma.jpg', name: 'Emma Stone', handle: '@EStone'},
        {src: 'will.jpg', name: 'Will Ferrell', handle: '@anchorman'},
        {src: 'jake.jpg', name: 'Jake Gyllenhaal', handle: '@JakeG'}
      ],
      following: [
        {src: 'emma.jpg', name: 'Emma Stone', handle: '@EStone', time: '20 min', tweet: 'I am so bad with computers!!', comments: '1,000', retweets: '550', like: '1,000,003'},
        {src: 'jake.jpg', name: 'Jake Gyllenhaal', handle: '@JakeG', time: '55 min', tweet: 'Should me and the rock do another sub-par movie together????', comments: '2,030', retweets: '50', like: '20,003'},
        {src: 'emma.jpg', name: 'Emma Stone', handle: '@EStone', time: '1.4 hr', tweet: 'Flaws are my faorite part of people, usually.', comments: '100,000', retweets: '1,000,002', like: '5,000,003'},
        {src: 'emma.jpg', name: 'Emma Stone', handle: '@EStone', time: '12 hr', tweet: 'I am into grilled cheese. It makes me feel beautiful', comments: '100,500', retweets: '1,000,032', like: '5,000,103'},
        {src: 'will.jpg', name: 'Will Ferrell', handle: '@anchorman', time: '3 hr', tweet: 'YOU SIT ON A THRONE OF LIES!', comments: '299,000', retweets: '2,883,993', like: '6,124,993'}
      ],
      tweets: [
        {content: 'It is super windy outside!'}
      ],
      tweet: {content: ''}
    }
  },
  methods: {
    addNewTweet () {
      let newTweet = {
        content: this.tweet.content
      };
      this.tweets.push (newTweet)
    }
  }

}
</script>
