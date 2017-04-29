import numpy as np

"""
result = np.zeros((180, 360))

for i in range(1,13):
    mat = np.loadtxt('data/sun'+str(i)+'.csv', delimiter=',')
    result = result + mat

print(result)
np.savetxt('data/yearly_sunlight.csv', result, delimiter=',', fmt='%f')
"""

maxnum = 0
minnum = 10000000000
mat = np.loadtxt('data/yearly_sunlight.csv', delimiter=',')
for i in range(0,180):
    for j in range(0,360):
        value = mat[i,j]
        if value > maxnum:
            maxnum = value
        if value < minnum:
            minnum = value

print("min = "+ str(minnum))
print("max = "+str(maxnum))
