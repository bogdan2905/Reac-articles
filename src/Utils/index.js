import {Map, OrderedMap} from 'immutable'

export function arrToMap(arr, DataRecord = Map)
{
   return arr.reduce((acc, elem) => acc.set(elem.id, new DataRecord(elem)), new OrderedMap({}));
}

export function mapToArr(map)
{
    return map.valueSeq().toArray();
}