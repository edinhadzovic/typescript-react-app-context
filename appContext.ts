import * as React from "react";

export interface IAppContext {
    api: ApiCalls;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

const ctx: React.Context<Partial<IAppContext>> = React.createContext<Partial<IAppContext>>({
    api: new ApiCalls("/api/admin"),
});

export const AppContextProvider: any = ctx.Provider;
export const AppContextConsumer: any = ctx.Consumer;

/**
 * AppConsumer.
 *
 * @export
 * @template P
 * @template R
 * @param {(React.ComponentClass<P> | React.StatelessComponent<P>)} Component
 * @returns {React.FunctionComponent<R>}
 */
export function withAppContext<
    P extends { appContext?: IAppContext },
    R = Omit<P, "appContext">
>(
    Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.FunctionComponent<R> {
    return function BoundComponent(props: any): JSX.Element {
        return (
            <AppContextConsumer>
                {(value: IAppContext) => <Component {...props} appContext={value} />}
            </AppContextConsumer>
        );
    };
}

/**
 * AppProvider
 *
 * @export
 * @class AppContext
 * @extends {React.Component<{}, IAppContext>}
 */
export default class AppContext extends React.Component<{}, IAppContext> {
    constructor(props: {}) {
        super(props);

        this.state = {
            api: new ApiCalls("/api/admin"),
        };
    }

    componentDidMount = () => {
    }

    render(): JSX.Element {

        return (
            <AppContextProvider value={this.state}>
                {this.props.children}
            </AppContextProvider>
        );
    }
}
