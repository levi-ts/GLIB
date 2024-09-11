precision mediump float;

attribute vec3 pos;
attribute vec3 normal;
attribute vec2 texCoord;

varying vec3 fragNormal;
varying vec3 fragLightVec;
varying vec3 fragViewVec;
varying vec2 fragTexCoord;

uniform mat4 matProj;
uniform mat4 matView;
uniform mat4 matWorld;

void main()
{
    vec3 worldPos = (matWorld * vec4(pos, 1.0)).xyz;

    mat3 normalMatrix = mat3(matWorld);
    fragNormal = normalize(normalMatrix * normal);

    fragLightVec = vec3(3.0, 3.0, 3.0) - worldPos; 
    fragViewVec = vec3(3.0, 3.0, 3.0) - worldPos;

    fragTexCoord = texCoord;
    
    gl_Position = matProj * matView * matWorld * vec4(pos, 1.0);
}