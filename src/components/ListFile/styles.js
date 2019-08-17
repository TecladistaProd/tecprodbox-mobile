import React from 'react';
import s from 'styled-components/native';

export const File = s.TouchableOpacity`
flex-direction: row;
align-items: center;
justify-content: space-between;
padding-vertical: 20;
`;

export const FileInfo = s.View`
flex-direction: row;
align-items: center;
`;

export const FileTitle = s.Text`
font-size: 16;
color: #333;
margin-left: 10;
`;

export const FileDate = s.Text`
fontSize: 14;
color: #666;
`;
