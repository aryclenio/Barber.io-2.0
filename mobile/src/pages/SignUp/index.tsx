import React, { useRef, useCallback } from 'react';
import { Image, ScrollView, View, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button'
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import logoImg from '../../assets/logo.png'
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const formRef = useRef<FormHandles>(null);

    const handleSignUp = useCallback(
        async (data: SignUpFormData) => {
            try {
                // Limpa erros do form
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório.'),
                    email: Yup.string()
                        .required('E-mail obrigatório.')
                        .email('Digite um e-mail válido.'),
                    password: Yup.string().min(
                        6,
                        'A senha deve ter no mínimo 6 digitos.',
                    ),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });

                Alert.alert(
                    'Cadastro realizado com sucesso!',
                    'Você já pode fazer login!'
                )
                await api.post('/users', data);
                navigation.goBack();

            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                Alert.alert(
                    'Erro no cadastro',
                    'Ocorreu um erro no cadastro.',
                );
            }
        },
        [navigation],
    );

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
                        <Form ref={formRef} onSubmit={handleSignUp}>
                            <Input
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus()
                                }}
                            />
                            <Input
                                ref={emailInputRef}
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus()
                                }}
                            />
                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                textContentType="newPassword"
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm()
                                }}
                            />

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