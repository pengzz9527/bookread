export interface BookPostContent {
    title: string;
    author: string;
    review: string;
}

export interface BookPostData {
    id: string;
    publishDate: string;
    imageUrl: string;
    amazonLink: string;
    en: BookPostContent;
    zh: BookPostContent;
}
