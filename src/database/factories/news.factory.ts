import { News } from "src/news/entities/news.entity";
import { setSeederFactory } from "typeorm-extension";

export const newsFactory = setSeederFactory(News, async (faker) => {
    const news = new News({
        title: faker.lorem.sentence(),
        subtitle: faker.lorem.sentence(),
        content_text: faker.lorem.paragraphs(3),
        img_url: faker.image.imageUrl(),
        read_time: faker.number.int({
            min: 1,
            max: 30
        })
    });
    return news
})
