import { BookPostData } from './types';

export const ADMIN_PASSWORD = "admin_password123";

export const INITIAL_BOOK_POSTS: BookPostData[] = [
    {
        id: '1',
        publishDate: "2023-10-15T00:00:00.000Z",
        imageUrl: "https://picsum.photos/seed/silentpatient/600/800",
        amazonLink: "#",
        en: {
            title: "The Silent Patient",
            author: "Alex Michaelides",
            review: "A shocking psychological thriller of a woman's act of violence against her husband—and of the therapist obsessed with uncovering her motive. Alicia Berenson’s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London’s most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word."
        },
        zh: {
            title: "沉默的病人",
            author: "亚历克斯·麦克利兹",
            review: "一个令人震惊的心理惊悚故事，讲述了一名女子对丈夫的暴力行为，以及一位痴迷于揭开她动机的治疗师。艾丽西亚·贝伦森的生活看似完美。她是一位著名的画家，嫁给了一位炙手可热的时尚摄影师，住在一栋可以俯瞰公园的豪宅里。一天晚上，她的丈夫加布里埃尔从时尚拍摄现场晚归，艾丽西亚朝他脸上开了五枪，然后一言不发。"
        }
    },
    {
        id: '2',
        publishDate: "2023-10-10T00:00:00.000Z",
        imageUrl: "https://picsum.photos/seed/hailmary/600/800",
        amazonLink: "#",
        en: {
            title: "Project Hail Mary",
            author: "Andy Weir",
            review: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn’t know that. He can’t even remember his own name, let alone the nature of his assignment or how to complete it. All he knows is that he’s been asleep for a very, very long time. And he’s just been awakened to find himself millions of miles from home, with nothing but two corpses for company."
        },
        zh: {
            title: "挽救计划",
            author: "安迪·威尔",
            review: "莱兰·格雷斯是一项孤注一掷的最后机会任务中的唯一幸存者——如果他失败，人类和地球本身都将灭亡。然而，现在他并不知道这一切。他甚至记不起自己的名字，更不用说他的任务性质或如何完成它了。他只知道自己已经沉睡了很长时间。他刚刚醒来，发现自己离家数百万英里，只有两具尸体陪伴。"
        }
    },
    {
        id: '3',
        publishDate: "2023-09-28T00:00:00.000Z",
        imageUrl: "https://picsum.photos/seed/klarasun/600/800",
        amazonLink: "#",
        en: {
            title: "Klara and the Sun",
            author: "Kazuo Ishiguro",
            review: "From her place in the store, Klara, an Artificial Friend with outstanding observational qualities, watches carefully the behavior of those who come in to browse, and of those who pass on the street outside. She remains hopeful a customer will soon choose her. Klara and the Sun is a thrilling book that offers a look at our changing world through the eyes of an unforgettable narrator, and one that explores the fundamental question: what does it mean to love?"
        },
        zh: {
            title: "克拉拉与太阳",
            author: "石黑一雄",
            review: "克拉拉是一个具有出色观察力的人工智能朋友，在商店里，她仔细观察着进来浏览的顾客和外面街上路过的人们的行为。她一直希望很快会有顾客选择她。《克拉拉与太阳》是一本激动人心的书，通过一个令人难忘的叙述者的眼睛，审视我们不断变化的世界，并探讨了一个根本性问题：爱意味着什么？"
        }
    }
];
