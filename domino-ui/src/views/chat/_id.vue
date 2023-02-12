<template>
	<div>
		<vue-advanced-chat
			height="calc(100vh - 235px)"
			:current-user-id="currentUserId"
			:rooms="JSON.stringify(rooms)"
			:rooms-loaded="true"
			:messages="JSON.stringify(messages)"
			:messages-loaded="messagesLoaded"
			@send-message="sendMessage($event.detail[0])"
		/>
	</div>
</template>

<script>
import { register } from 'vue-advanced-chat'
register()
export default {
	data() {
		return {
			currentUserId: '1234',
			rooms: [
				{
					roomId: '1',
					roomName: 'duin',
					users: [
						{ _id: '1234', username: 'duin' },
					]
				}
			],
			messages: [],
            messagesLoaded: true
		}
	},
	methods: {
		async sendMessage(message) {
			this.messages = [
				...this.messages,
				{
					_id: this.messages.length,
					content: message.content,
					senderId: this.currentUserId,
					timestamp: new Date().toString().substring(16, 21),
					date: new Date().toDateString()
				}
			]
    },
	},
    async created() {
        const result = await fetch("http://localhost:3000/chat/all", {
        method: "POST",
        body: JSON.stringify({
          id:  JSON.parse(localStorage.getItem('userInfo') || '{}').id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      if (result.status === 201) {
        const {userId1, userId2, _id, ...response1} = response.userChats[0]
        console.log(userId1, userId2, _id, response1)
        this.currentUserId = JSON.parse(localStorage.getItem('userInfo') || '{}').id
        response1.room.users[0]._id = '62f6d7bcc740b744cbb4aaaa'
        response1.room.users[1]._id = '62f6a66edd602fd2abba739f'
        const rooms1 = []
        rooms1.push(response1.room)
        this.rooms = rooms1
        const messages1 = []
        for(let i = 0; i < response1.messages.length; i++) {
            messages1.push(response1.messages[i])
        }
        this.messages = messages1
      }
    }}
</script>

<style lang="scss">
body {
	font-family: 'Quicksand', sans-serif;
}
</style>