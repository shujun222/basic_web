a = 3
b = "sj"
d = True
# print(c) # 没赋值还是不能直接用的
print(d)

def test():
    a = 4
    print("a in test", a)
    aa = 66

test()
print("a in outer", a)
# 局部变量是不能访问的
# print("aa in outer", aa)

def test2():
    print("a in test2", a)
    print(a + 2)

    # a = 66
test2()
print("aa in outer", a)


