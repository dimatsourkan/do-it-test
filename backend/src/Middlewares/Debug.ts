import {ExpressMiddlewareInterface, Middleware} from "routing-controllers";

/**
 * Мидлвейр для дебагинга запросов
 */
@Middleware({type : 'before'})
export class DebugMiddleware implements ExpressMiddlewareInterface {

    use(req: any, res: any, next : Function) : void {
        console.log('/***************************************************************************/');
        console.log(`Method    :`, req.method);
        console.log(`URL       :`, req.url);

        console.log(`Body      :`, req.body);
        console.log(`Params    :`, req.params);
        console.log(`Query     :`, req.query);
        console.log('/***************************************************************************/');

        next()
    }

}