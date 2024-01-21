import { ref } from "vue";
import { $api } from "@/http/api";
import { defineStore } from "pinia";

export const useArticleStore = defineStore('ArticleStore', () => {
    const articles = ref([])

    const fetchArticles = async () => {
        try {
            const response = await $api.get('/article')

            articles.value = [...response.data]

            console.log(articles.value)
        } catch (error) {
            console.lolg(error)
        }
    }

    const getArticleDetail = async (article) => {
        try {
            const detail = await $api.get(`article/${article.id}/detail`)

            article.content.detail = { ...detail }
            
            return {
                article
            }
        } catch (error) {
            console.log(error)            
        }
    }

    return {
        articles,
        fetchArticles,
        getArticleDetail
    }
})