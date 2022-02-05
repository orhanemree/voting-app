<template>
    <div class="w-full h-screen">
        <div v-if="voting" class="p-8 bg-green-100 text-center min-h-[calc(100vh-48px)]">
            <h1 class="text-2xl font-bold">{{voting[1].name}}</h1>
            <span class="mb-8 block text-gray-700 text-lg">{{voted ? "You have already voted." : "Vote your choice!"}}</span>
            <div>
                <VTooltip :triggers="['hover', 'click']" class="inline-block">
                    <button @click="share()" class="text-green-800 underline transition hover:text-green-500">Share</button>
                    <template #popper>
                        {{clipboard}}
                    </template>
                </VTooltip>
                this voting with your friends!
            </div>
            <ul class="flex content-start justify-center gap-8 pt-8 flex-wrap">
                <li class="hover:shadow-2xl transition bg-green-600 rounded border border-black p-4 sm:w-48 w-full" v-for="(option, id) in voting[1].options" :key="id">
                    <div class="flex items-center justify-center gap-4">
                        <div class="text-xl font-bold">{{option.name}}</div>
                        <div class="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center">{{option.vote}}</div>
                    </div>
                    <div v-if="!voted" class="text-gray-900">Vote for {{option.name}}</div> <br>
                    <button @click="vote(option, $event)" class="hover:border-black disabled:hover:border-green-700 border-green-700 border transition bg-green-700 rounded px-2 py-1 disabled:border" :disabled="voted">Vote ✋</button>
                </li>
            </ul>
        </div>
        <div v-else class="bg-green-100 min-h-[calc(100vh-48px)] flex items-center justify-center flex-col gap-10">
            <div class="text-4xl text-green-800 font-bold">404 Voting Not Found ;(</div>
            <div class="text-lg">You can return <a href="/" class="text-green-800 underline transition hover:text-green-500">Home</a> and create your own voting.</div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from "./Footer.vue"
import { getDatabase, ref, update } from "firebase/database";
export default {
    name: "Vote",
    components: {
        Footer,
    },
    data(){
        return{
            alreadyVoted: [],
            voted: false,
            clipboard: "Copy clipboard",
        }
    },
    props: {
        voting: Object,
    },
    methods: {
        vote(option, e){
            if (!this.voted){
                const db = getDatabase();
                const updates = {}
                updates[`votings/${this.voting[0]}/options/${this.voting[1].options.indexOf(option)}/vote`] = option.vote + 1
    
                update(ref(db), updates); 
                option.vote++;
    
                this.alreadyVoted.push(this.voting[1].id);
                window.localStorage.setItem("alreadyVoted", JSON.stringify(this.alreadyVoted));
                this.voted = true;
                e.target.innerText = "Voted 🤝";
            }
        },
        share(){
            navigator.clipboard.writeText(window.location.href);
            this.clipboard = "Copied!";
        }
    },
    mounted(){
        const alreadyVoted = JSON.parse(window.localStorage.getItem("alreadyVoted")) || [];
        this.alreadyVoted = alreadyVoted;
        if (alreadyVoted.includes(this.voting[1].id)){
            this.voted = true;
        }
    }
}
</script>