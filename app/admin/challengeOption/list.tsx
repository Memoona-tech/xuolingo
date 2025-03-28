import {Datagrid , List , TextField, ReferenceField, NumberField, BooleanField} from 'react-admin';

export const ChallengeOptionList = () =>{
    return (
    <List >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="text" />
            <BooleanField
            source='correct'
            />
            <ReferenceField source='challengeId' reference='challenges'/>
            <NumberField source="order" />
            <TextField source='imageSrc'/>
            <TextField source='audioSrc'/>
        </Datagrid>
    </List>
    );

}