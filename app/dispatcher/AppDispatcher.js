import Dispatcher from 'flux';
import assign from 'object-assign';
import PayloadSources from '../constants/PayloadSources';

export default assign(new Dispatcher(), {

    handleServerAction(action) {
        if (!action.type) {
            throw new Error('Empty action.type: you likely mistyped the action.');
        }

        var payload = {
            source: PayloadSources.SERVER_ACTION,
            action: action
        };

        this.dispatch(payload);
    },

    handleViewAction(action) {
        if (!action.type) {
            throw new Error('Empty action.type: you likely mistyped the action.');
        }

        var payload = {
            source: PayloadSources.VIEW_ACTION,
            action: action
        };

        this.dispatch(payload);
    }
});
