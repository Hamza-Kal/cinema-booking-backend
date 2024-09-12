export interface ICreateScreening{
    name: string;
    movie_id: string;
    cinema_hall_id: string;
    start_time: Date;
    end_time: Date;
    available_seats: string[];
    total_seats: number;
}