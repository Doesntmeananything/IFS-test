import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChannelsState {
    selectedChannelId: string;
}

const initialState: ChannelsState = {
    selectedChannelId: '411',
};

export const counter = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        selectChannel: (state, action: PayloadAction<string>) => {
            state.selectedChannelId = action.payload;
        },
    },
});

export const { selectChannel } = counter.actions;

export default counter.reducer;
