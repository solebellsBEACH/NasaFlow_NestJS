import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique('unique_title', ['title'])
export class News {

    constructor(partial?: Partial<News>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    subtitle: string;

    @Column()
    content_text: string;

    @Column()
    img_url: string;

    @Column()
    read_time: number;
}
