function middlewarePipeline(context: any, middleware: any, index: any) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return (param: any) => {
    if (param) return context.next(param);

    const nextPipeline = middlewarePipeline(context, middleware, index + 1);

    nextMiddleware({ ...context, next: nextPipeline });
  };
}

export default middlewarePipeline;
