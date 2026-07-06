export default abstract class BaseService {
    abstract getMostsRecent(limit: number): Promise<Message[]>;
}


