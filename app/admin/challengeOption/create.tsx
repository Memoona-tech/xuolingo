import {Create, ReferenceInput, required, SimpleForm , TextInput, BooleanInput} from 'react-admin';

export const ChallengeOptionCreate = () =>{
    return (
    <Create >
        <SimpleForm >
            <TextInput 
            source="text" 
            validate={[required()]} 
            label="Text" />

            <BooleanInput source='correct' label="Correct option"/>

            <ReferenceInput 
            source="challengeId" 
            reference="challenges" />
            
            <TextInput 
            source="imageSrc" 
            label="Image Url" />

            <TextInput 
            source="audioSrc" 
            label="Audio Url" />

        </SimpleForm>
    </Create>
    );

}