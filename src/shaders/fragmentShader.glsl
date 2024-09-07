precision mediump float;

varying vec3 fragNormal;
varying vec3 fragLightVec;
varying vec3 fragViewVec;
varying vec2 fragTexCoord;

uniform sampler2D sampler;
uniform samplerCube environmentMap;

uniform vec3 ambientColor;
uniform vec3 diffuseColor;
uniform vec3 specularColor;
uniform vec3 emissiveColor;
uniform float ambientIntensity;
uniform float diffuseIntensity;
uniform float specularIntensity;
uniform float emissiveIntensity;
uniform float shininess;
uniform float opacity;

const float EPSILON = 0.000001;

void main()
{
    vec3 N = normalize(fragNormal);
    
    vec3 L = normalize(fragLightVec);
    vec3 V = normalize(fragViewVec);
    vec3 R = reflect(-V, N);

    vec4 texture = texture2D(sampler, fragTexCoord);

    vec3 ambient = ambientColor * ambientIntensity;
    vec3 diffuse = diffuseColor * max(dot(L, N), 0.0) * diffuseIntensity;
    vec3 specular = specularColor * pow(max(dot(R, V), EPSILON), shininess) * specularIntensity;

    vec3 reflection = textureCube(environmentMap, R).rgb;

    gl_FragColor = vec4((ambient + diffuse + specular + reflection) * texture.rgb, texture.a * opacity);

    //gl_FragColor = texture;
    
    // gl_FragColor = vec4(fragNormal, 1.0);
}