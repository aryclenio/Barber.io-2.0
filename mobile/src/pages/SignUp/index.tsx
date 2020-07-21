import React, { useRef } from 'react';
import { Image, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'

import Input from '../../components/Input';
import Button from '../../components/Button'
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import logoImg from '../../assets/logo.png'
import { useNavigation } from '@react-navigation/native';

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    contentContainerStyle={{ flex: 1 }}>
                    <Container>
                        <Image source={logoImg} />
                        <View>
                            <Title>Crie sua conta</Title>
                        </View>
                        <Form ref={formRef} onSubmit={() => { }}>
                            <Input name="name" icon="user" placeholder="Nome" />
                            <Input name="email" icon="mail" placeholder="E-mail" />
                            <Input name="password" icon="lock" placeholder="Senha" />

                            <Button onPress={() => {
                                formRef.current?.submitForm()
                            }}>Entrar</Button>
                        </Form>

                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <BackToSignIn onPress={() => navigation.goBack()}>
                <FeatherIcon name="arrow-left" size={20} color="#fff" />
                <BackToSignInText>Voltar para logon</BackToSignInText>
            </BackToSignIn>
        </>
    );
}

export default SignIn;