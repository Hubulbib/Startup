import { $api } from "@/http/api";
import { defineStore } from "pinia";

const useArticleStore = defineStore('ArticleStore', () => {
    const articles = ref([])

    const fetchArticles = async () => {
        await $api
                .get('/article')
                .then(r => articles.value = r.data)
                .catch(error => console.log(error))
    }

    const getArticleDetail = async (article) => {
        try {
            const detail = await $api.get(`article/${article.id}/detail`)

            article.content = {
                ...detail
            }
            
            return {
                article
            }
        } catch (error) {
            console.log(error)            
        }
    }
})