import NotFound from "../errors/NotFound";

export default (limit: string, offset: string, total: number): number => {
    const limitNumber = parseInt(limit);
    const offsetNumber = parseInt(offset);
    let offsets = (Math.ceil(total / limitNumber));
    if (offsets === 0) {
        offsets = 1;
    }
    if (offsetNumber > offsets) {
        throw new NotFound(`Page ${offsetNumber} does not exists, offset cannot be greater than offsets = ${offsets}`);
    }
    return offsets;
}